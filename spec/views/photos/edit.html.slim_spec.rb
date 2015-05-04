require 'rails_helper'

RSpec.describe "photos/edit", type: :view do
  before(:each) do
    @photo = assign(:photo, Photo.create!(
      :file => "MyString",
      :thumbnail => "MyString",
      :project_id => "MyString",
      :order_in_project => 1
    ))
  end

  it "renders the edit photo form" do
    render

    assert_select "form[action=?][method=?]", photo_path(@photo), "post" do

      assert_select "input#photo_file[name=?]", "photo[file]"

      assert_select "input#photo_thumbnail[name=?]", "photo[thumbnail]"

      assert_select "input#photo_project_id[name=?]", "photo[project_id]"

      assert_select "input#photo_order_in_project[name=?]", "photo[order_in_project]"
    end
  end
end
