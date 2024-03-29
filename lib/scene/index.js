'use strict'
// @flow

/**
 * Navigator导航中心
 */
import React, {
  View,
  StyleSheet,
  InteractionManager,
  Image,
} from 'react-native';

import {msg} from 'iflux-native';

import Header from './header';
import Body from './body';
import Kit from '../kit';

/**
 */
class Scene extends React.Component {

  static defaultProps = {

    style: null,
    bodyStyle: null,
    backgroundImage: null,

    //
    onMount: null,

    //@see QMConst.Loading
    loading: null,

    //头部
    header: '',
    hasBack: false,
    renderHeader: '',
    onBackHandler: null
  };

  componentWillMount () {
    if (this.props.onMount) {
      InteractionManager.runAfterInteractions (this.props.onMount);
    }
  }

  render () {
    return (
      <View style={[this.props.style, styles.container]}>
        {this._renderWrapper ()}
      </View>
    )
  }

  _renderWrapper () {
    if (this.props.backgroundImage) {
      return (
        <Image source={this.props.backgroundImage} style={styles.wrapperImage}>
          {this._renderHeader ()}
          <Body loading={this.props.loading} style={this.props.bodyStyle}>
            {this.props.children}
          </Body>
        </Image>
      );
    }
    else {
      return (
        <View style={styles.wrapper}>
          {this._renderHeader ()}
          <Body loading={this.props.loading} style={this.props.bodyStyle}>
            {this.props.children}
          </Body>
        </View>
      );
    }
  }

  _renderHeader () {
    let props = this.props;
    //
    if (props.renderHeader) {
      return props.renderHeader ();
    }
    //
    else if (props.header) {
      let brandName = props.hasBack ? null : props.header,
        title = props.hasBack ? props.header : null;
      return <Header brandName={brandName} leftTitle={title} onLeftMenuPress={this._onLeftMenuPress}></Header>;
    }
    //
    else {
      return null;
    }
  }

  _onLeftMenuPress = () => {
    if (this.props.onBackHandler) {
      this.props.onBackHandler ();
    }
    else if (this.props.hasBack) {
      msg.emit ('route:backToLast');
    }
  };
}

const styles = StyleSheet.create ({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1
  },
  wrapperImage: {
    width: Kit.Width,
    height: Kit.Height
  }
});

Scene.Body = Body;
export default Scene;
