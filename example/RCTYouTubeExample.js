'use strict';
 
import React, {Component} from 'react';
import YouTube from 'react-native-youtube';
import { AppRegistry } from 'react-native';

import {
  StyleSheet,
  PixelRatio,
  Dimensions,
  ScrollView,
} from 'react-native';

const styles=StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  player:{
    height:PixelRatio.roundToNearestPixel(Dimensions.get('window').width/(16/9)),
    alignSelf:'stretch',
    backgroundColor:'black',
    marginVertical:10,
  },
});

class RCTYouTubeExample extends Component {
  constructor(props) {
    super(props);
    this.state={
      play:true,
      fullscreen:true,
    };
  }
 
  render() {
    const opts={
      loop:false,
      showFullscreenButton:false,
      showinfo:false,
      modestbranding:true,
      controls:2,
      rel:true,
    }
    console.log('RCTYouTubeExample render opts',opts);

    return (
      <ScrollView style={styles.container}>
        <YouTube
          ref={(ref)=>{
            this._videoPlayer=ref;
          }}
          apiKey='<YourAPIkey>'
          videoId='KVZ-P-ZI6W4'
          play={this.state.play}
          fullscreen={this.state.fullscreen}
          loop={opts.loop}
          style={styles.player}
          showFullscreenButton={opts.showFullscreenButton||true}
          showinfo={opts.showinfo||true}
          modestbranding={opts.modestbranding||true}
          rel={opts.rel||false}
          controls={opts.controls==undefined?2:opts.controls}

          onError={(e)=>{this.videoError(e.error)}}
          onChangeState={(e)=>{this.videoState({e:e,state:e.state})}}
          onReady={(e)=>{this.videoState({e:e,state:'ready'})}}
          onProgress={(e)=>{this.videoProgress({e:e,currentTime:e.currentTime,duration:e.duration})}}
          onChangeQuality={(e)=>{this.videoState({e:e,quality:e.quality})}}
          />
        </ScrollView>
    )
 
  } // render
  videoError(e){
    console.log('PlayVideo ****************ERROR',e)
  }
  videoState(e){
    console.log('PlayVideo state change',e)
    if (e.state=='playing'){
      // hack to get video to autoplay in portrait
      if (this.state.fullscreen){
        this.setState({fullscreen:false,})
      }
    }
  }
  videoProgress(e){
    console.log('videoProgress event,videoPosition',e);
  }
}


AppRegistry.registerComponent('RCTYouTubeExample', () => RCTYouTubeExample);
