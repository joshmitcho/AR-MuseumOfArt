/*
 * Copyright 2016 Google Inc. All rights reserved.
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
'use strict';

// Create viewer.
var viewer = new Marzipano.Viewer(document.getElementById('pano'));

/*/ Create source.
var source = Marzipano.ImageUrlSource.fromString(
  "//www.marzipano.net/media/furnace/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: "//www.marzipano.net/media/furnace/preview.jpg" });*/

// Josh
var source = Marzipano.ImageUrlSource.fromString(
  "//joshpmitchell.ca/ar-museumofart/project-title/app-files/tiles/0-dscn0003/{z}/{f}/{y}/{x}.jpg",
  { cubeMapPreviewUrl: "//joshpmitchell.ca/ar-museumofart/project-title/app-files/tiles/0-dscn0003/preview.jpg" });

// Set up autorotate, if enabled.
var autorotate = Marzipano.autorotate({
  yawSpeed: 0.02,
  targetPitch: 0,
  targetFov: Math.PI/2
});

viewer.startMovement(autorotate);
viewer.setIdleMovement(10000, autorotate);

// end Josh

// Create geometry.
var geometry = new Marzipano.CubeGeometry([
    { tileSize: 256, size: 256, fallbackOnly: true },
    { size: 512, tileSize: 512 },
    { size: 1024, tileSize: 512 },
    { size: 2048, tileSize: 512 }
]);

// Create view.
var limiter = Marzipano.RectilinearView.limit.traditional(2048, 120*Math.PI/180);
var view = new Marzipano.RectilinearView( {yaw: 0, pitch: 0, roll: 0, fov: Math.PI/2 }, limiter);

// Create scene.
var scene = viewer.createScene({
  source: source,
  geometry: geometry,
  view: view,
  pinFirstLevel: true
});

// Display scene.
scene.switchTo({ transitionDuration: 1 });
