import React from 'react'

const EnvTest = () => {
    return (
        <div>
            CF_PAGES ENVIRONMENT VARIABLE = {process.env.REACT_APP_CF_PAGES}
        </div>
    )
}

export default EnvTest
