require 'rails_helper'

RSpec.describe "projects/index", type: :view do
  before(:each) do
    assign(:projects, [
      Project.create!(
        :project_name => "Project Name",
        :thumbnail_picture_id => 1,
        :user_id => 2,
        :status => 3,
        :description => "Description"
      ),
      Project.create!(
        :project_name => "Project Name",
        :thumbnail_picture_id => 1,
        :user_id => 2,
        :status => 3,
        :description => "Description"
      )
    ])
  end

  it "renders a list of projects" do
    render
    assert_select "tr>td", :text => "Project Name".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
    assert_select "tr>td", :text => "Description".to_s, :count => 2
  end
end
