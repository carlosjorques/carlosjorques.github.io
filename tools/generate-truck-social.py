"""Render the Open Graph covers of the truck series and the cruise controller game in the site's editorial style.

Requires Python Playwright, Microsoft Edge and access to Google Fonts.
Run: python tools/generate-truck-social.py [folder ...]
(for example control-engineering-in-ten-levels to render only that article's cover)
"""

from dataclasses import dataclass
from html import escape
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "public" / "images" / "blog"
TEMPLATE = Path(__file__).with_name("truck-social-template.html").read_text(
    encoding="utf-8"
)
SERIES_FOOTER = "Series: The value of control software in electric heavy-duty trucks"


@dataclass(frozen=True)
class Cover:
    filename: str
    part: str
    title_lines: tuple[str, ...]
    value: str
    detail_lines: tuple[str, ...]
    title_size: int = 70
    value_size: int = 78
    folder: str = "control-software-electric-trucks"
    footer: str = SERIES_FOOTER
    # A game cover shows a level picker instead of a number: (cleared, total).
    levels: tuple[int, int] | None = None


COVERS = (
    Cover(
        "part1-social.png",
        "Part 1 of 4",
        ("How thermal limits set the", "battery size of an electric truck"),
        "About 32%",
        ("of the reference truck's purchase price", "is its battery"),
        value_size=70,
    ),
    Cover(
        "part2-social.png",
        "Part 2 of 4",
        ("How predictive thermal control", "saves energy in electric trucks"),
        "2–4%",
        ("higher efficiency than production", "feedback control in trucks"),
    ),
    Cover(
        "part3-social.png",
        "Part 3 of 4",
        (
            "How a 3% efficiency gain changes",
            "the economics of an electric truck",
        ),
        "1.2–2.5×",
        ("the electricity saving in the model,", "depending on use and specification"),
        title_size=62,
    ),
    Cover(
        "part4-social.png",
        "Part 4 of 4",
        ("Control software performance", "as a vehicle design input"),
        "3%",
        (
            "gain worth 21,600–30,500 € per truck",
            "over 8 years with design assumptions",
        ),
    ),
    Cover(
        "series-social.png",
        "Four-part series",
        ("The value of control software", "in electric heavy-duty trucks"),
        "2–4%",
        (
            "less whole-vehicle energy than production",
            "feedback control in truck tests",
        ),
    ),
    Cover(
        "social.png",
        "Interactive article",
        ("Build a cruise controller", "yourself"),
        "",
        ("Drive the truck yourself, then build", "the controller that beats you"),
        title_size=84,
        folder="control-engineering-in-ten-levels",
        footer="Ten playable levels, from your own foot to predictive control",
        levels=(3, 10),
    ),
)


def evidence(cover: Cover) -> str:
    if cover.levels is None:
        return f'<strong><span class="mark">{escape(cover.value)}</span></strong>'
    cleared, total = cover.levels
    tiles = []
    for n in range(1, total + 1):
        if n <= cleared:
            tiles.append(f"<li>{n}<small>★★★</small></li>")
        elif n == cleared + 1:
            tiles.append(f'<li class="now">{n}</li>')
        else:
            tiles.append(f'<li class="locked">{n}</li>')
    return f'<ol class="levels" aria-label="Levels">{"".join(tiles)}</ol>'


def markup(cover: Cover) -> str:
    fields = {
        "PART": escape(cover.part),
        "TITLE": "<br>".join(map(escape, cover.title_lines)),
        "EVIDENCE": evidence(cover),
        "DETAIL": "<br>".join(map(escape, cover.detail_lines)),
        "FOOTER": escape(cover.footer),
        "TITLE_SIZE": str(cover.title_size),
        "VALUE_SIZE": str(cover.value_size),
    }
    html = TEMPLATE
    for key, value in fields.items():
        html = html.replace("{{" + key + "}}", value)
    return html


def render(only: set[str] | None = None) -> None:
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="msedge", headless=True)
        try:
            page = browser.new_page(viewport={"width": 1200, "height": 630})
            for cover in COVERS:
                if only and cover.folder not in only:
                    continue
                output = BLOG / cover.folder
                output.mkdir(parents=True, exist_ok=True)
                page.set_content(markup(cover), wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                fonts = page.evaluate(
                    """() => [...document.fonts]
                        .filter(face => face.status === 'loaded')
                        .map(face => face.family)"""
                )
                if not {"Instrument Sans", "Source Serif 4"} <= set(fonts):
                    raise RuntimeError(f"Web fonts did not load for {cover.filename}: {fonts}")

                bounds = page.locator(".card").evaluate(
                    """card => {
                        const title = card.querySelector('h1').getBoundingClientRect();
                        const evidence = card.querySelector('.evidence').getBoundingClientRect();
                        const footer = card.querySelector('.footer').getBoundingClientRect();
                        const detail = card.querySelector('.evidence p').getBoundingClientRect();
                        return {
                            titleFits: title.left >= 0 && title.right <= 1128
                                && title.bottom + 25 < evidence.top,
                            evidenceFits: evidence.bottom + 20 < footer.top
                                && detail.right <= 1128
                        };
                    }"""
                )
                if not all(bounds.values()):
                    raise ValueError(f"Cover content does not fit: {cover.filename}: {bounds}")

                page.locator(".card").screenshot(path=str(output / cover.filename))
                print(f"Rendered {cover.folder}/{cover.filename}")
        finally:
            browser.close()


if __name__ == "__main__":
    import sys

    render(set(sys.argv[1:]) or None)
