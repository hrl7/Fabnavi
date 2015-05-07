require 'rails_helper'

RSpec.describe "timings/edit", type: :view do
  before(:each) do
    @timing = assign(:timing, Timing.create!(
      :time => "MyString",
      :movie => ""
    ))
  end

  it "renders the edit timing form" do
    render

    assert_select "form[action=?][method=?]", timing_path(@timing), "post" do

      assert_select "input#timing_time[name=?]", "timing[time]"

      assert_select "input#timing_movie[name=?]", "timing[movie]"
    end
  end
end
