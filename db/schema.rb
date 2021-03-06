# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20150526075902) do

  create_table "movies", force: :cascade do |t|
    t.string   "file"
    t.integer  "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "photos", force: :cascade do |t|
    t.string   "file",                          null: false
    t.string   "thumbnail",                     null: false
    t.string   "project_id",                    null: false
    t.integer  "order_in_project", default: -1, null: false
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "photos", ["file"], name: "index_photos_on_file"
  add_index "photos", ["project_id"], name: "index_photos_on_project_id"

  create_table "projects", force: :cascade do |t|
    t.string   "project_name",         default: "", null: false
    t.integer  "thumbnail_picture_id", default: 0,  null: false
    t.integer  "user_id",                           null: false
    t.integer  "status",               default: 0,  null: false
    t.string   "description",          default: "", null: false
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
  end

  add_index "projects", ["project_name", "user_id"], name: "index_projects_on_project_name_and_user_id", unique: true

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "project_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "taggings", ["project_id"], name: "index_taggings_on_project_id"
  add_index "taggings", ["tag_id"], name: "index_taggings_on_tag_id"

  create_table "tags", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "timings", force: :cascade do |t|
    t.string   "time"
    t.integer  "movie_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.string   "name",                   default: "", null: false
    t.string   "provider",                            null: false
    t.string   "uid",                                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["name"], name: "index_users_on_name", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["uid"], name: "index_users_on_uid", unique: true

end
