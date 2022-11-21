const t = (err, req, res, next) => {
  console.log('error' + err)

  res.json({
    err: err
  })

}


export default t;
