import Method1 from './Method1';
import Method2 from './Method2';

const DoublePatternDoor = (props) => {
  return (
    <>
      {/*{props.method === 'method1' &&  <Method1 {...props} />};*/}
      {props.method === 'method2' &&  <Method2 {...props} />};
    </>
  )
};

export default DoublePatternDoor;
