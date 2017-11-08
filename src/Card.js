import React,{Component} from 'react'

export class Card extends Component{
    render() {
		const classes = this.props.className;
		const turned = this.props.isSelected || this.props.didMatch? 'card flipped' : 'card';
		

		// let style = {
		// 	visibility: toggleVisible,
		// };

		return (
			<div className='flip' id={this.props.id} onClick={this.props.handleClick.bind(this)}>
				<div className={turned}>
					<div className={`face back`}> </div>
					<div className={`face front ${this.props.className}`}> </div>
				</div>
			</div>
		);
	}
}
export default Card