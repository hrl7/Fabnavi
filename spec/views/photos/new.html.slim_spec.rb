require 'rails_helper'

RSpec.describe "photos/new", type: :view do
  before(:each) do
    assign(:photo, Photo.new(
      :file => "MyString",
      :thumbnail => "MyString",
      :project_id => "MyString",
      :order_in_project => 1
    ))
  end

  it "renders new photo form" do
    render

    assert_select "form[action=?][method=?]", photos_path, "post" do

      assert_select "input#photo_file[name=?]", "photo[file]"

      assert_select "input#photo_thumbnail[name=?]", "photo[thumbnail]"

      assert_select "input#photo_project_id[name=?]", "photo[project_id]"

      assert_select "input#photo_order_in_project[name=?]", "photo[order_in_project]"
    end
  end
end
