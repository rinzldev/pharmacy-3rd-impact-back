const message = require('./messages.json')

function makeResponsesError(res, code) {
  const msg = {
    OK: 0,
    Message: message[[code]]
  }
  res.status(404).json(msg)
}

function makeResponsesException(res, err) {
  const msg = {
    OK: 0,
    Message: err
  }
  res.status(404).json(msg)
}

function makeResponsesOk(res, code) {
  const msg = {
    OK: 1,
    Message: message[[code]]
  }
  res.status(200).json(msg)
}

function makeResponsesOkData(res, data, code) {
  const msg = {
    OK: 1,
    Data: data,
    Message: message[[code]]
  }
  res.status(200).json(msg)
}

module.exports = {
  makeResponsesException,
  makeResponsesOkData,
  makeResponsesError,
  makeResponsesOk
}