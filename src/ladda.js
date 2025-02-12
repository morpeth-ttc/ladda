import fs from 'fs';
import path from 'path';

export class Ladda {
  static BLANK_DB = { ranking: [], history: {} };

  constructor(dbPath) {
    this.dbPath = dbPath;
    this.db = this.#loadDb();
    this.now = new Date().toISOString();
  }

  dumpDb() {
    console.log(JSON.stringify(this.db));
  }

  initDb() {
    this.db = { ...Ladda.BLANK_DB };
    this.#writeDb();
  }

  addPlayer(name) {
    if (this.db.history.hasOwnProperty(name)) {
      throw new Error(`player "${name}" already exists`);
    }
    this.db.ranking.push(name);
    this.db.history[name] = [];
    this.#writeDb();
  }

  addMatch(winner, loser) {
    if (!this.db.history.hasOwnProperty(winner)) {
      throw new Error(`player "${winner}" doesn't exist`);
    }
    if (!this.db.history.hasOwnProperty(loser)) {
      throw new Error(`player "${loser}" doesn't exist`);
    }
    
    this.db.history[winner].unshift([this.now, loser , true]);
    this.db.history[loser ].unshift([this.now, winner, false]);
    
    const windex = this.db.ranking.indexOf(winner);
    const lindex = this.db.ranking.indexOf(loser);
    
    if (windex > lindex) {
      this.db.ranking.splice(windex, 1);
      this.db.ranking.splice(lindex, 0, winner);
    }
    
    this.#writeDb();
  }

  #loadDb() {
    try {
      return JSON.parse(fs.readFileSync(this.dbPath, 'utf8'));
    } catch (error) {
      return null;
    }
  }

  #writeDb() {
    this.db.updated = this.now;
    fs.writeFileSync(this.dbPath, JSON.stringify(this.db));
  }
}
