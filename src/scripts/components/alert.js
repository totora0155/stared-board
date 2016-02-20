// import React from 'react';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
//
// class Alert extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       title: 'a',
//       message: 'b',
//     };
//   }
//
//   test() {
//     this.setState({
//       title: 'foo',
//       message: 'bar',
//     });
//   }
//
//   handleClick() {
//     this.setState({
//       title: '',
//       message: '',
//     });
//   }
//
//   render() {
//     return (
//       <ReactCSSTransitionGroup transitionName="alert" transitionEnterTimeout={300} transitionLeaveTimeout={300}>
//         <section className="alert__box" ref="root">
//           <header>
//             <span className="alert__title">{this.state.title}</span>
//           </header>
//           <div>
//             <p className="alert__body">{this.state.message}</p>
//           </div>
//           <div onClick={this.handleClick.bind(this)}>#####</div>
//         </section>
//       </ReactCSSTransitionGroup>
//     );
//   }
// }
//
// export default Alert;
