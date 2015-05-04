require 'rails_helper'

RSpec.describe "projects/new", type: :view do
  before(:each) do
    assign(:project, Project.new(
      :project_name => "MyString",
      :thumbnail_picture_id => 1,
      :user_id => 1,
      :status => 1,
      :description => "MyString"
    ))
  end

  it "renders new project form" do
    render

    assert_select "form[action=?][method=?]", projects_path, "post" do

      assert_select "input#project_project_name[name=?]", "project[project_name]"

      assert_select "input#project_thumbnail_picture_id[name=?]", "project[thumbnail_picture_id]"

      assert_select "input#project_user_id[name=?]", "project[user_id]"

      assert_select "input#project_status[name=?]", "project[status]"

      assert_select "input#project_description[name=?]", "project[description]"
    end
  end
end
