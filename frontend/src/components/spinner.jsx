import React, {CSSProperties} from 'react'
import BeatLoader from "react-spinners/BeatLoader";

/* const override: CSSProperties = {
  opacity: 90
} */
function spinner() {
  return (
    <div className='flex justify-center items-center mt-40'>
    <BeatLoader
        color={"#3e3d73"}
        aria-label="Loading Spinner"
/*         cssOverride={override}
 */        size={10}
      />
    </div>
  )
}
export default spinner
