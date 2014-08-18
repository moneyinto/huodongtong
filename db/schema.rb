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

ActiveRecord::Schema.define(version: 20140818102105) do

  create_table "activities", force: true do |t|
    t.string   "username"
    t.string   "activityname"
    t.string   "name"
    t.string   "phone"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bid_lists", force: true do |t|
    t.string   "username"
    t.string   "activityname"
    t.string   "bidname"
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bid_messages", force: true do |t|
    t.string   "username"
    t.string   "activityname"
    t.string   "bidname"
    t.string   "name"
    t.string   "phone"
    t.string   "price"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "bids", force: true do |t|
    t.string   "name"
    t.string   "phone"
    t.string   "price"
    t.string   "count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: true do |t|
    t.string   "username"
    t.string   "activityname"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", force: true do |t|
    t.string   "status"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "price_counts", force: true do |t|
    t.string   "username"
    t.string   "activityname"
    t.string   "bidname"
    t.string   "price"
    t.string   "count"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "password_digest"
    t.string   "forget_issues"
    t.string   "forget_answer"
    t.string   "token"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "identity"
  end

end
