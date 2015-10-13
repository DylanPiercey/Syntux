var React = require('react');
var hljs = require('highlight.js/lib/highlight.js');
hljs.registerLanguage(__language__, __parser__);

module.exports = React.createClass({
  displayName: 'HighLight-' + __language__,
  render: function () {
    return React.createElement('pre', { className: 'hljs ' + __language__ },
      React.createElement('code', {
        className: 'hljs ' + __language__,
        dangerouslySetInnerHTML: {
          __html: hljs.highlight(
            __language__,
            React.Children.only(this.props.children),
            true
          ).value
        }
      })
    );
  }
});
