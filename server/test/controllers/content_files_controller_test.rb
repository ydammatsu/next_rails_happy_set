require "test_helper"

class ContentFilesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @content_file = content_files(:one)
  end

  test "should get index" do
    get content_files_url, as: :json
    assert_response :success
  end

  test "should create content_file" do
    assert_difference("ContentFile.count") do
      post content_files_url, params: { content_file: { content: @content_file.content, name: @content_file.name } }, as: :json
    end

    assert_response :created
  end

  test "should show content_file" do
    get content_file_url(@content_file), as: :json
    assert_response :success
  end

  test "should update content_file" do
    patch content_file_url(@content_file), params: { content_file: { content: @content_file.content, name: @content_file.name } }, as: :json
    assert_response :success
  end

  test "should destroy content_file" do
    assert_difference("ContentFile.count", -1) do
      delete content_file_url(@content_file), as: :json
    end

    assert_response :no_content
  end
end
