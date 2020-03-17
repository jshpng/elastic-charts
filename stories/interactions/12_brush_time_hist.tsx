/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License. */

import { action } from '@storybook/addon-actions';
import React from 'react';
import { Axis, Chart, niceTimeFormatter, Position, ScaleType, Settings, HistogramBarSeries } from '../../src';

import { boolean } from '@storybook/addon-knobs';
import { DateTime } from 'luxon';
import { getChartRotationKnob } from '../utils/knobs';

export const example = () => {
  const now = DateTime.fromISO('2019-01-11T00:00:00.000')
    .setZone('utc+1')
    .toMillis();
  const oneDay = 1000 * 60 * 60 * 24;
  const formatter = niceTimeFormatter([now, now + oneDay * 5]);
  return (
    <Chart className="story-chart">
      <Settings
        debug={boolean('debug', false)}
        onBrushEnd={(start, end) => {
          action('onBrushEnd')(formatter(start), formatter(end));
        }}
        onElementClick={action('onElementClick')}
        rotation={getChartRotationKnob()}
      />
      <Axis id="bottom" position={Position.Bottom} title="bottom" showOverlappingTicks={true} tickFormat={formatter} />
      <Axis id="left" title="left" position={Position.Left} tickFormat={(d) => Number(d).toFixed(2)} />

      <HistogramBarSeries
        id="bars"
        xScaleType={ScaleType.Time}
        yScaleType={ScaleType.Linear}
        xAccessor="x"
        yAccessors={['y']}
        timeZone="Europe/Rome"
        data={[
          { x: now, y: 2 },
          { x: now + oneDay, y: 7 },
          { x: now + oneDay * 2, y: 3 },
          { x: now + oneDay * 5, y: 6 },
        ]}
      />
    </Chart>
  );
};