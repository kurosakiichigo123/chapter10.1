
const deepCopyOf = require('./util');
const Model = require('./model');

class Repository {
  #heroes;

  constructor() {
    this.#heroes = [
      { name: `Bob`, level: `senior` },
      { name: `Kevin`, level: `middle` },
      { name: `Dave`, level: `junior` }
    ];
  }

  readHeroes() {
    return deepCopyOf(this.#heroes);
  }

  createHero(heroToBeCreated) {
    this.#heroes.push(heroToBeCreated);
  }

  deleteHero(nameOfHeroToBeDeleted) {
    this.#heroes = this.#heroes.filter(
      (hero) => {
        return hero.name !== nameOfHeroToBeDeleted;
      }
    );
  }
}

module.exports = Repository;
