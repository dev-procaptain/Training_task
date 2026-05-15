import { useAppSelector, selectDoorMethod } from '../../../store';
import Method1 from './method1';
import Method2 from './method2';

const methodComponents = {
  method1: <Method1 />,
  method2: <Method2 />,
};

const Door = () => {
  const doorMethod = useAppSelector(selectDoorMethod);
  return <>{methodComponents[doorMethod]}</>;
};

export default Door;
