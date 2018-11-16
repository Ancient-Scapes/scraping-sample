defmodule Scraping do
  def main do
    IO.inspect fetchNewsList
  end

  # 記事のタイトルとリンク一覧を取得
  def fetchNewsList do
    HTTPoison.get!("https://gigazine.net/").body
    |> Floki.find("div.card > h2 > a")
    |> Enum.map(&(extractionNews(&1)))
    # 広告はtitleがないのでfilterで抜く
    |> Enum.filter(&(&1["title"] !== []))
  end

  # 必要な情報のみ抽出
  def extractionNews(n) do
    %{
      "title" => Floki.attribute(n, "title"),
      "link" => Floki.attribute(n, "href")
    }
  end

end
