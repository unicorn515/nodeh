import 'bootstrap-webpack';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import {getTopicList} from './lib/client';

getTopicList({})
 .then(ret => console.log(ret))
 .catch(err => console.log(err));

// console.log('hello. world');


ReactDOM.render(<App />, document.body);
