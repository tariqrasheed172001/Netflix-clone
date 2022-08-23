import React from 'react'
import { Oval } from "react-loader-spinner";

function pageLoader() {
  return (
    <div>
        <Oval
                height={80}
                width={80}
                color="red"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                ariaLabel='oval-loading'
                secondaryColor="red"
                strokeWidth={2}
                strokeWidthSecondary={2}
             />
    </div>
  )
}

export default pageLoader