
function deepCopyOf(entity) {
    return JSON.parse(JSON.stringify(entity));
  }
  
  module.exports = deepCopyOf;
  