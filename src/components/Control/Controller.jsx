import React from 'react'
import '../../assets/scss/controller.scss'
import '../../assets/scss/icon.scss'
import '../../assets/scss/control-item.scss'
import Switch from '@mui/material/Switch';
import {useSelector, useDispatch} from 'react-redux';
import {setAutoRotate, setInsideRotate, setTransparent} from '../../store';
import gsap from "gsap";

const Controller = ({orbitRef}) => {
	const controlBuild = useSelector(state => state.controlReducer);
	const dispatch = useDispatch();
	
	const autoRotate = () => {
		controlBuild.rotateBuild ? dispatch(setAutoRotate(false)) : dispatch(setAutoRotate(true));
	} 
	
	const insideBuild = () => {
		let targetDistance = 30;
		if(controlBuild.insideBuild){ 
			targetDistance = 800;
		}
		gsap.to(orbitRef.current, {
			onStart: () => {
				orbitRef.current.enableRotation = false;	
			},
			minDistance: targetDistance,
			maxDistance: targetDistance,
			duration: 0.5,
			overwrite: true,
			onComplete: () => {
				orbitRef.current.minDistance = 30;
				orbitRef.current.maxDistance = 800;
				orbitRef.current.enableRotate = true;
			},
		});
		controlBuild.insideBuild ? dispatch(setInsideRotate(false)) : dispatch(setInsideRotate(true));
	} 
	
	const Transparent = () => {
		controlBuild.transparentBuild ? dispatch(setTransparent(false)) : dispatch(setTransparent(true));
	}
	return (
		<div className='controller'>
			<ul className='control'>
				<li className='control-item'>
					<span className='icon' onClick={autoRotate}>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20">
							<g id="Rotate" transform="translate(-10643 -7792)">
								<rect id="Rectangle_28077" data-name="Rectangle 28077" width="20" height="20" transform="translate(10643 7792)" fill="none"/>
								<path id="rotate-2" data-name="rotate" d="M-1770.347,7144.828a.283.283,0,0,1-.027-.4l.715-.817a15.761,15.761,0,0,1-5.668-1.086c-1.722-.737-2.672-1.746-2.672-2.84a3.486,3.486,0,0,1,2.418-3.04v-5.13a.269.269,0,0,1,.054-.162l2.44-3.244a.273.273,0,0,1,.216-.109h7.384a.274.274,0,0,1,.217.109l2.438,3.244a.264.264,0,0,1,.055.162v5.16a3.187,3.187,0,0,1,2.418,3.01c0,.971-.77,1.9-2.165,2.6a14.075,14.075,0,0,1-5.1,1.269h-.022a.285.285,0,0,1-.285-.262.286.286,0,0,1,.263-.307c3.844-.3,6.742-1.717,6.742-3.3a2.523,2.523,0,0,0-1.849-2.4v1.494a.27.27,0,0,1-.272.27h-12.261a.27.27,0,0,1-.271-.27v-1.506a2.845,2.845,0,0,0-1.85,2.415c0,.841.849,1.687,2.327,2.318a15.165,15.165,0,0,0,5.436,1.039l-.706-.807a.283.283,0,0,1,.027-.4.284.284,0,0,1,.4.026l1.126,1.283a.284.284,0,0,1,0,.375l-1.126,1.283a.279.279,0,0,1-.214.1A.282.282,0,0,1-1770.347,7144.828Zm.185-6.323h6.842v-6.721h-6.842Zm-4.878-6.9v6.9h4.336v-6.9l-2.168-2.88Zm4.743-.359h6.706l-2.032-2.7h-6.706Z" transform="translate(12422.18 665.551)"/>
								<path id="rotate_-_Outline" data-name="rotate - Outline" d="M-1770.161,7145.048a.43.43,0,0,1-.286-.108.434.434,0,0,1-.147-.3.427.427,0,0,1,.108-.312l.505-.577a15.72,15.72,0,0,1-5.406-1.089c-1.782-.763-2.763-1.82-2.763-2.978a3.6,3.6,0,0,1,2.418-3.138v-5.032a.419.419,0,0,1,.084-.253l2.439-3.243a.425.425,0,0,1,.336-.168h7.384a.426.426,0,0,1,.337.168l2.439,3.244a.413.413,0,0,1,.085.252v5.055a3.224,3.224,0,0,1,2.418,3.115c0,1.031-.8,2-2.247,2.738a14.217,14.217,0,0,1-5.159,1.285h-.033a.437.437,0,0,1-.434-.4.437.437,0,0,1,.4-.468,13.565,13.565,0,0,0,4.758-1.154c1.19-.583,1.845-1.294,1.845-2a2.317,2.317,0,0,0-1.549-2.174v1.266a.421.421,0,0,1-.422.419h-12.261a.42.42,0,0,1-.421-.419v-1.259a2.586,2.586,0,0,0-1.55,2.168c0,.778.815,1.573,2.236,2.18a14.785,14.785,0,0,0,5.036,1.016l-.478-.547a.426.426,0,0,1-.107-.311.435.435,0,0,1,.147-.3.436.436,0,0,1,.286-.108.433.433,0,0,1,.326.148l1.126,1.283a.435.435,0,0,1,0,.574l-1.126,1.283A.429.429,0,0,1-1770.161,7145.048Zm-2.712-16.9a.124.124,0,0,0-.1.049l-2.439,3.244a.12.12,0,0,0-.024.072v5.229l-.091.039a3.354,3.354,0,0,0-2.327,2.9c0,1.03.917,1.99,2.581,2.7a15.678,15.678,0,0,0,5.613,1.074l.32.007-.926,1.058a.131.131,0,0,0-.033.1.135.135,0,0,0,.046.094.133.133,0,0,0,.087.033.13.13,0,0,0,.1-.045l1.128-1.285a.134.134,0,0,0,0-.177l-1.126-1.283a.131.131,0,0,0-.1-.046.134.134,0,0,0-.089.033.136.136,0,0,0-.046.094.13.13,0,0,0,.032.095l.932,1.064-.341-.008a15.4,15.4,0,0,1-5.491-1.051c-1.537-.657-2.419-1.552-2.419-2.456a2.974,2.974,0,0,1,1.934-2.549l.216-.1v1.746a.12.12,0,0,0,.121.12h12.261a.12.12,0,0,0,.122-.12v-1.716l.206.083a2.664,2.664,0,0,1,1.943,2.542c0,.828-.715,1.634-2.014,2.271a13.862,13.862,0,0,1-4.867,1.183.137.137,0,0,0-.125.147.136.136,0,0,0,.135.123h.014a13.922,13.922,0,0,0,5.042-1.253c1.343-.681,2.083-1.558,2.083-2.47a3.056,3.056,0,0,0-2.319-2.869l-.1-.036v-5.265a.112.112,0,0,0-.023-.069l-2.44-3.246a.123.123,0,0,0-.1-.049Zm9.7,10.506h-7.142v-7.021h7.142Zm-6.842-.3h6.542v-6.421h-6.542Zm-.542.3h-4.636v-7.1l2.318-3.08,2.318,3.08Zm-4.336-.3h4.036v-6.7l-2.018-2.681-2.018,2.681Zm11.6-6.962h-7.082l-.045-.06-2.213-2.943h7.082l.045.06Zm-6.932-.3h6.331l-1.807-2.4h-6.331Z" transform="translate(12422.18 665.551)"/>
							</g>
						</svg>
						<label>Rotate</label>
					</span>
				</li>
				<li className='control-item'>
					<span className='icon' onClick={insideBuild}>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 20 20">
							<g id="Zoom" transform="translate(-10643 -7792)">
									<rect id="Rectangle_28077" data-name="Rectangle 28077" width="20" height="20" transform="translate(10643 7792)" fill="none"/>
									<path id="Union_376" data-name="Union 376" d="M8.409,16.07l.013-6.5L6.3,11.695l-.661-.661,3.251-3.25,3.25,3.25-.661.661L9.343,9.56v6.51Zm2.532-1.177a3.39,3.39,0,0,0,.066-.466c.01-.155.016-.31.016-.465h3.457v-8.5L8.889,1.188,3.3,5.458v8.5H6.754c0,.155.005.31.017.465a3.24,3.24,0,0,0,.066.466H2.365V6.17l-1.3.988-.5.387L0,6.807,8.889,0l8.888,6.807-.563.738-.5-.387-1.3-.988v8.722Z" transform="translate(10644.111 7793.965)"/>
							</g>
						</svg>
						<label>Inside</label>
					</span>
				</li>
				<li className='control-item'>
					<div className='icon'>
						<Switch
								color="primary"
								size="small"
								//checked={Transparent}
								onChange={Transparent}
						/>
						<label className="form-label">Frame</label>
				</div>
				</li>
				
			</ul>
		</div>
	)
}

export default Controller