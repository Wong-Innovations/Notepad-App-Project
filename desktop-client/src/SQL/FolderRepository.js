

class FolderRepository {
  constructor(dao) {
    this.dao = dao
  }

  // Write methods
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS FOLDERS (
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      FOLDER_NAME TEXT NULL
      )`
    return this.dao.run(sql)
  }

  create(FOLDER_NAME) {
    return this.dao.run(
      `INSERT INTO FOLDERS (FOLDER_NAME) VALUES (?)`,
      [FOLDER_NAME])
  }

  update(folder) {
    const { id, name } = folder
    return this.dao.run(
      `UPDATE FOLDERS SET FOLDER_NAME = ? WHERE ID = ?`,
      [name, id]
    )
  }

  delete(id) {
    return this.dao.run(
      `DELETE FROM FOLDERS WHERE ID = ?`,
      [id]
    )
  }

  // Read methods
  getById(id) {
    return this.dao.get(
      `SELECT * FROM FOLDERS WHERE ID = ?`,
      [id])
  }

  getAll() {
    return this.dao.all(`SELECT * FROM FOLDERS`)
  }
}

export default FolderRepository;