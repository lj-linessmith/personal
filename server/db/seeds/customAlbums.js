import albums from '../data/albums.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('album').del()
  await knex('album').insert(albums)
}
