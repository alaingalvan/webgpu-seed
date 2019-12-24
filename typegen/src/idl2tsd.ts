// Originally by Rico Possienka (http://www.possienka.de/)

var outStr = new Array();

export function getOutput() {
    return outStr.join('');
}

function print(...str: string[]) {
    outStr.push(...str);
}

function whitespace() {
    print('\t');
}

function isNonEmptyArray(obj) {
    return !!obj.length;
}

function readTypedefs(typedefs) {
    function getNamespaceObject(namespace) {
        if (Array.isArray(namespace)) {
            namespace = namespace[namespace.length - 1].idlType;
        }

        //foo::bar => bar
        var touple = namespace.split(/::/);
        return touple[touple.length - 1];
    }

    var touples = typedefs.map(function(td) {
        //typedef unsigned long GLenum -> ["GLenum", "unsigned long"]
        return [ td.name, td.idlType.idlType ];
    });

    var ret = Object.create(null);
    touples.forEach(function(t) {
        var from = t[0];
        var to = getNamespaceObject(t[1]);
        if (from !== to) ret[from] = to;
    });

    return ret;
}

function mapIdlTypeToTSType(typedefs, name) {
    if (typedefs[name]) {
        return mapIdlTypeToTSType(typedefs, typedefs[name]);
    }

    switch (name) {
        case 'boolean':
            return 'boolean';

        case 'unsigned long':
        case 'unsigned long long':
        case 'byte':
        case 'octet':
        case 'short':
        case 'long':
        case 'long long':
        case 'unsigned byte':
        case 'unsigned short':
        case 'unsigned int':
        case 'float':
        case 'unrestricted float':
        case 'double':
        case 'unrestricted double':
        case 'DOMTimeStamp':
            return 'number';

        case 'DOMString':
        case 'USVString':
            return 'string';

        case 'FloatArray':
            return 'Float32Array';

        case 'object':
            return 'any';

        default:
            return name;
    }
}

function getTSType(idlType, typedefs) {
    if (idlType === undefined) {
        return '';
    }
    if (typeof idlType === 'string') {
        return mapIdlTypeToTSType(typedefs, idlType);
    }
    if (Array.isArray(idlType)) {
        return idlType.reduce((prev, cur, i) => prev + (i != 0 ? ' | ' : '') + getTSType(cur, typedefs), '');
    }
    var name = getTSType(idlType.idlType, typedefs);
    if (
        (idlType.type === 'sequence' ||
            idlType.generic === 'sequence' ||
            (idlType.parent && idlType.parent.generic === 'sequence')) &&
        !/\[\]/.exec(name)
    ) {
        return name + '[]';
    }
    if (idlType.generic === 'Promise') {
        return `Promise<${name}>`;
    }

    return name;
}

function getArgs(args, typedefs) {
    return args
        .map(function(arg) {
            var parameterType = '';

            if (arg.idlType.union) {
                parameterType +=
                    '(' +
                    arg.idlType.idlType
                        .map(function(idlType) {
                            return getTSType(idlType.idlType, typedefs);
                        })
                        .join(' | ') +
                    ')';
            } else {
                parameterType += getTSType(arg.idlType.idlType, typedefs);
            }
            if (arg.variadic) parameterType += '[]';
            return (arg.variadic ? '...' : '') + arg.name + (arg.optional ? '?' : '') + ': ' + parameterType;
        })
        .join(', ');
}

function printInterfaces(interfaces, typedefs) {
    interfaces.forEach(function(interf) {
        print('interface ');
        print(interf.name);
        if (interf.name == 'GPURenderPassEncoder' || interf.name == 'GPURenderEncoderBase') {
            var i = 100;
        }

        if (interf.inheritance !== null) {
            print(' extends ', interf.inheritance);
        }

        print(' {\n');

        if (Object.keys(interf.members).length === 0) {
            //issue #1: Interfaces without members are considered "the same",
            //so add an unsued fake member to make interfaces unique
            //example:
            //
            //  interface WebGLBuffer : WebGLObject {
            //  };
            //
            //becomes
            //
            //  interface WebGLBuffer extends WebGLObject {
            //      $__dummyprop__WebGLBuffer : any;
            //  };
            // var dummymember = {
            //     type: 'attribute',
            //     name: '$__dummyprop__' + interf.name,
            //     idlType: 'any'
            // };
            // printMembers([ dummymember ]);
        } else {
            printMembers(interf.members);
        }

        print('}\n\n');
        if (
            interf.members.length > 0 &&
            interf.members.reduce((prev, cur) => {
                if (!cur.name) return false;
                return prev && cur.name.toUpperCase() === cur.name;
            }, true)
        ) {
            //We have a constant dictionary, make it accessible as a var:
            print('declare const ' + interf.name + ' : ' + interf.name + ';\n\n');
        }
        function printMembers(members) {
            function printTSType(idlType) {
                print(getTSType(idlType, typedefs));
            }

            function printMembers(members) {
                members.forEach(function(member) {
                    var type = member.idlType || member.type;

                    whitespace();

                    print(member.name);
                    if (member.name === 'loadValue') {
                        var i = 0;
                    }
                    if (!member.required) {
                        print('?');
                    }
                    print(': ');
                    printTSType(type);
                    print(';\n');
                });
            }

            function printOperations(ops) {
                'use strict';

                ops.forEach(function(op) {
                    whitespace();
                    if (interf.type !== 'callback interface') {
                        print(op.name);
                    }
                    print('(');
                    print(getArgs(op.arguments, typedefs));
                    print('): ');
                    print(getTSType(op.idlType, typedefs));
                    print(';\n');
                });
            }

            var constants = members.filter(function(member) {
                return member.type === 'const';
            });
            var attributes = members.filter(function(member) {
                return member.type === 'attribute';
            });
            var operations = members.filter(function(member) {
                return member.type === 'operation' && !member.stringifier;
            });
            var dicAttributes = members.filter(function(member) {
                return member.type === 'field';
            });

            printMembers(constants);
            printMembers(attributes);
            printMembers(dicAttributes);
            printOperations(operations);
        }
    });
}

function printImplements(impls) {
    impls.forEach(function(impl) {
        print('interface ');
        print(impl.target);
        print(' extends ');
        print(impl.implements);
        print(' {\n}\n\n');
    });
}

function printCallbacks(callbacks, typedefs) {
    callbacks.forEach((callback) => {
        print('interface ', callback.name, ' {\n');
        whitespace();
        print(
            '(',
            getArgs(callback.arguments, typedefs),
            '): ' + getTSType(callback.idlType.idlType, typedefs) + ';\n'
        );
        print('}\n');
    });
}

function printEnums(enums) {
    enums.forEach((enum1) => {
        print('declare type ');
        print(enum1.name);
        print(' = \n');
        enum1.values.forEach(({ value }, i) => print("'", value, "'", i !== enum1.values.length - 1 ? ' |\n' : ';\n'));
    });
}

function printIncludes(includes: { type: 'includes'; target: string; includes: string }[]) {
    includes.forEach((include) => {
        print('declare interface ', include.target, ' extends ', include.includes, ' {};\n');
    });
}

export function printModuleMember(module) {
    if (isNonEmptyArray(module)) {
        var typedefs = readTypedefs(module.filter((token) => token.type === 'typedef'));
        var dictionaries = module.filter((def) => def.type === 'dictionary');
        var interfaces = module.filter(
            (def) => def.type === 'interface' || def.type === 'interface mixin' || def.type === 'callback interface'
        );
        var enums = module.filter((def) => def.type === 'enum');
        var submodules = module.filter((def) => def.type === 'module');
        var impls = module.filter((def) => def.type === 'implements');
        var callbacks = module.filter((def) => def.type === 'callback');
        var includes = module.filter((def) => def.type === 'includes');

        printEnums(enums);
        printInterfaces(dictionaries, typedefs);
        printInterfaces(interfaces, typedefs);
        printImplements(impls);
        printModuleMember(submodules);
        printCallbacks(callbacks, typedefs);
        printIncludes(includes);
    }
}
