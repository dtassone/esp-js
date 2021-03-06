// notice_start
/*
 * Copyright 2015 Dev Shop Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 // notice_end

var path = require('path');

module.exports = function (config) {
    var configuration = {
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'tests/testIndex.js'
        ],
        exclude: [],
        preprocessors: {
            'tests/testIndex.js': ['webpack']
        },
        webpack: {
            watch: false,
            devtool: '#inline-source-map',
            module: {
                loaders: [
                    {
                        loader: "babel-loader",

                        // Skip any files outside of your project's `src` directory
                        include: [
                            path.resolve(__dirname, "src"),
                            path.resolve(__dirname, "tests"),
                        ],
                        test: /\.jsx?$/,
                        query: {
                            presets: ['es2015', 'stage-0'],
                            plugins: ['transform-runtime', 'transform-decorators-legacy', 'transform-flow-strip-types']
                        }
                    }
                ]
            }
        },
        reporters: ['progress', 'spec'],
        port: 5010,
        colors: true,
        logLevel: config.LOG_DEBUG,
        autoWatch: true,
        browsers: ['Chrome'],
        singleRun: false,
        plugins: [
            require("karma-jasmine"),
            require("karma-chrome-launcher"),
            require("karma-webpack"),
            require("karma-spec-reporter")
        ],
        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }
    };
    // http://stackoverflow.com/questions/19255976/how-to-make-travis-execute-angular-tests-on-chrome-please-set-env-variable-chr
    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
        configuration.singleRun = true;
    }
    config.set(configuration);
};
