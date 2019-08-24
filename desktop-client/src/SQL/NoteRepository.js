

class NoteRepository {
  constructor(dao) {
    this.dao = dao
  }

  // Write methods
  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS NOTES (
      FOLDER_ID INTEGER PRIMARY KEY,
      ID INTEGER PRIMARY KEY AUTOINCREMENT,
      FOLDER_CONTENTS_NAME TEXT NULL,
      FOLDER_CONTENTS_VALUE TEXT NULL
      )`
    return this.dao.run(sql)
  }

  create(FOLDER_ID, ID, FOLDER_CONTENTS_NAME, FOLDER_CONTENTS_VALUE) {
    return this.dao.run(
      `INSERT INTO NOTES (FOLDER_ID, ID, FOLDER_CONTENTS_NAME, FOLDER_CONTENTS_VALUE)
        VALUES (? ? ? ?)`,
      [FOLDER_ID, ID, FOLDER_CONTENTS_NAME, FOLDER_CONTENTS_VALUE]
    )
  }

  update(note) {
    const { folder_id, id, folder_contents_name, folder_contents_value } = note
    return this.dao.run(
      `UPDATE NOTES SET FOLDER_CONTENTS_NAME = ?,
        FOLDER_CONTENTS_VALUE = ?,
        WHERE FOLDER_ID = ?,
        ID = ?`,
      [folder_contents_name, folder_contents_value, folder_id, id]
    )
  }

  delete(note) {
    const { folder_id, id } = note
    return this.dao.run(
      `DELETE FROM NOTES WHERE FOLDER_ID = ?, ID = ?`,
      [folder_id, id]
    )
  }

  // Read methods
  getById(folder_id, id) {
    return this.dao.get(
      `SELECT * FROM NOTES WHERE FOLDER_ID = ?, ID = ?`,
      [folder_id, id]
    )
  }

  getAll() {
    return this.dao.all(`SELECT * FROM NOTES`)
  }

  getAllNotes(folder_id) {
    return this.dao.get(
      `SELECT * FROM NOTES WHERE FOLDER_ID = ?`,
      [folder_id]
    )
  }
}

export default NoteRepository;