require 'rails_helper'

RSpec.describe "movies/new", type: :view do
  before(:each) do
    assign(:movie, Movie.new(
      :file => "MyString",
      :project => ""
    ))
  end

  it "renders new movie form" do
    render

    assert_select "form[action=?][method=?]", movies_path, "post" do

      assert_select "input#movie_file[name=?]", "movie[file]"

      assert_select "input#movie_project[name=?]", "movie[project]"
    end
  end
end
