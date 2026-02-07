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
  pgm.createTable("playlist_song_activities", {
    id: {
      type: "VARCHAR(50)",
      primaryKey: true,
    },
    playlist_id: {
      type: "VARCHAR(50)",
    },
    song_id: {
      type: "VARCHAR(50)",
    },
    user_id: {
      type: "VARCHAR(50)",
    },
    action: {
      type: "VARCHAR(50)",
    },
    time: {
      type: "TIMESTAMP",
      default: pgm.func("current_timestamp"),
    },
  });

  pgm.addConstraint(
    "playlist_song_activities",
    "fk_playlist_song_activities.playlist_id",
    "FOREIGN KEY(playlist_id) REFERENCES playlists(id) ON DELETE CASCADE",
  );
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {
  pgm.dropTable("playlist_song_activities");
};
