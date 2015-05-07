require 'rails_helper'

RSpec.describe "timings/new", type: :view do
  before(:each) do
    assign(:timing, Timing.new(
      :time => "MyString",
      :movie => ""
    ))
  end

  it "renders new timing form" do
    render

    assert_select "form[action=?][method=?]", timings_path, "post" do

      assert_select "input#timing_time[name=?]", "timing[time]"

      assert_select "input#timing_movie[name=?]", "timing[movie]"
    end
  end
end
