/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {
  pgm.createTable("songs", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    title: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    year: {
      type: "INTEGER",
      notNull: true,
    },
    performer: {
      type: "VARCHAR(255)",
      notNull: true,
    },
    genre: {
      type: "VARCHAR(100)",
      notNull: true,
    },
    duration: {
      type: "INTEGER",
      notNull: false,
    },
    album_id: {
      type: "VARCHAR(50)",
      notNull: false,
    },
  });

  // Add foreign key constraint
  pgm.addConstraint("songs", "fk_songs_album_id", {
    foreignKeys: {
      columns: "album_id",
      references: "albums(id)",
      onDelete: "CASCADE",
    },
  });

  // Add indexes for better query performance
  pgm.createIndex("songs", "album_id");
  pgm.createIndex("songs", "title");
  pgm.createIndex("songs", "performer");
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
    pgm.dropTable('songs');
};
