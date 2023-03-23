productsMockData = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  }
]

responseDBMock = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 2,
  info: '',
  serverStatus: 2,
  warningStatus: 0
}];

updateResponseMock = {
  id: 1,
  name: "Traje de crescimento"
};

module.exports = {
  productsMockData,
  responseDBMock,
  updateResponseMock,
};