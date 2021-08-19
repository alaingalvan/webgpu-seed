import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import path from 'path';
import { argv } from 'process';

let env = process.env['NODE_ENV'];
let isProduction =
    (env && env.match(/production/)) || argv.reduce((prev, cur) => prev || cur === '--production', false);

let config: webpack.Configuration = {
    context: path.join(__dirname, 'src'),
    entry: {
        app: './main.ts'
    },
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: [ '.ts', '.tsx', 'js' ],
        modules: [ path.resolve(__dirname, 'src'), 'node_modules' ],

    },
    module: {
        rules: [
            {
                test: /\.ts/,
                exclude: /node_modules/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                    compilerOptions: {
                        isolatedModules: true
                    }
                }
            }
        ]
    },
    node: false,
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(isProduction ? 'production' : 'development')
            }
        })
    ],
    optimization: {
        minimize: isProduction ? true : false
    }
};

/**
 * Start Build
 */
const compiler: webpack.Compiler = webpack(config);

if (!argv.reduce((prev, cur) => prev || cur === '--watch', false)) {
    compiler.run((err, stats) => {
        if (err) return console.error(err);

        if (stats.hasErrors()) {
            let statsJson = stats.toJson();
            console.log('❌' + ' · Error · ' + 'webgpu-seed failed to compile:');
            for (let error of statsJson.errors) {
                console.log(error.message);
            }
            return;
        }
        console.log(
            '✔️️' +
                '  · Success · ' +
                'webgpu-seed' +
                (isProduction ? ' (production) ' : ' (development) ') +
                'built in ' +
                (+stats.endTime - +stats.startTime + ' ms.')
        );
    });
} else {
    compiler.watch({}, (err, stats) => {
        if (err) return console.error(err);

        if (stats.hasErrors()) {
            let statsJson = stats.toJson();
            console.log('❌' + ' · Error · ' + 'webgpu-seed failed to compile:');
            for (let error of statsJson.errors) {
                console.log(error.message);
            }
            console.log('\n👀  · Watching for changes... · \n');
            return;
        }
        console.log(
            '✔️️' +
                '  · Success · ' +
                'webgpu-seed' +
                (isProduction ? ' (production) ' : ' (development) ') +
                'built in ' +
                (+stats.endTime - +stats.startTime + ' ms.') +
                '\n👀  · Watching for changes... · \n'
        );
    });
}
