import React from 'react';
import moment from 'moment';

const WidgetContext = React.createContext({});

function getWidgetName(eventTarget) {
  // console.log('eventTarget: ',eventTarget)
  if (!eventTarget) {
    return null;
  }
  if (eventTarget.attributes && eventTarget.attributes.widgetName) {
    return eventTarget.attributes.widgetName
  }
  if (eventTarget.parentNode) {
    return getWidgetName(eventTarget.parentNode)
  }
  return null;
}

function analyticsInfo(event) {
  //console.log('event: ', event)
  var element = event.target.outerHTML
  var widgetName = getWidgetName(event.target)
  var timeClicked = moment().format()

  console.log('element: ', element)
  console.log('timeClicked: ', timeClicked)
 // console.log('widgetName: ', widgetName)
}

window.addEventListener('click', analyticsInfo)

class ContextProvider extends React.Component {

  render() {
    return (
      <WidgetContext.Provider>
        {this.props.children}
      </WidgetContext.Provider>
    )
  }

}

export { ContextProvider };
export default WidgetContext;