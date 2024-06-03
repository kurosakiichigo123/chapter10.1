// model.js
class Model {
    #repository;
  
    constructor(repository) {
      this.#repository = repository;
    }
  
    readHeroes() {
      return this.#repository.readHeroes();
    }
  
    createHero(heroToBeCreated) {
      const name = heroToBeCreated.name;
      const level = heroToBeCreated.level;
      let errorMessages = ``;
  
      if (this.#wrongHeroName(name)) {
        errorMessages += "The hero name is wrong. It must have a length between 3 and 100.";
      }
  
      if (this.#wrongHeroLevel(level)) {
        errorMessages += "The hero level is required.";
      }
  
      if (this.#alreadyExistsHeroName(name)) {
        errorMessages += "The hero name already exists.";
      }
  
      if (errorMessages === ``) {
        this.#repository.createHero(heroToBeCreated);
      } else {
        throw new Error(errorMessages);
      }
    }
  
    deleteHero(nameOfHeroToBeDeleted) {
      if (this.#alreadyExistsHeroName(nameOfHeroToBeDeleted)) {
        this.#repository.deleteHero(nameOfHeroToBeDeleted);
      }
    }
  
    #wrongHeroName(name) {
      return name.length < 3 || name.length > 100;
    }
  
    #wrongHeroLevel(level) {
      return level === ``;
    }
  
    #alreadyExistsHeroName(name) {
      const heroes = this.#repository.readHeroes();
  
      for (const hero of heroes) {
        if (hero.name === name) {
          return true;
        }
      }
  
      return false;
    }
  }
  
  module.exports = Model;
  