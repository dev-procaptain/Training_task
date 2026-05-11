import {methodStore} from "../../../store";
import Method1 from "./method1";
import Method2 from "./method2";

const methodComponents={
	'method1': <Method1 />,
	'method2': <Method2 />
}

const Door=() => {
	const {methodInfo}=methodStore();
	return (
		<>
			{methodComponents[methodInfo]}
		</>
	)
}

export default Door;