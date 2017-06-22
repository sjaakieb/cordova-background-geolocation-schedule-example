/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    onDeviceReady: function () {
        this.receivedEvent('deviceready');        
        var bgGeo = window.BackgroundGeolocation;

        var callbackFn = function (location, taskId) {
            console.log('- Location MY', location);

            bgGeo.getState(function (state) {
                console.log(JSON.stringify(state));
            });

        };

        var failureFn = function (error) {
            console.log('BackgroundGeoLocation error', error);
        }

        // Listen to location event
        bgGeo.on('location', callbackFn, failureFn);

        bgGeo.configure({
            // Geolocation config
            desiredAccuracy: 0,
            stationaryRadius: 25,
            activityRecognitionInterval: 10000,
            stopTimeout: 5,
            debug: true,  // <-- Debug sounds & notifications.
            stopOnTerminate: false,
            startOnBoot: true,
            foregroundService: true,
            autoSync: true,
            schedule: ['2017-06-22-09:00 2018-01-01-17:00']
        }, function (state) {
            // Plugin is configured and ready to use.
            if (!state.enabled) {
                bgGeo.startSchedule(function () {
                    console.log('- Scheduler started');
                });
            }
        });
    },

    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }


};

app.initialize();