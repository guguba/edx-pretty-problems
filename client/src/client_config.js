const local_config = {
  SERVER: 'http://localhost:5000'
}

const prod_config = {
  SERVER: 'http://designedx.xyz'
}



const Client_config = (() => {
  const env = process.env.REACT_APP_ENV || process.env.NODE_ENV

  switch (env) {

    case 'prod':
      return prod_config

    case 'local':
      return local_config
  }
})()


console.log(process.env.REACT_APP_ENV || process.env.NODE_ENV, Client_config, 'env')

export { Client_config }
