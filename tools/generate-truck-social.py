"""Render the truck series' Open Graph covers using the site's editorial style.

Requires Python Playwright, Microsoft Edge and access to Google Fonts.
Run: python tools/generate-truck-social.py
"""

from dataclasses import dataclass
from html import escape
from pathlib import Path

from playwright.sync_api import sync_playwright


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "public" / "images" / "blog" / "control-software-electric-trucks"
TEMPLATE = Path(__file__).with_name("truck-social-template.html").read_text(
    encoding="utf-8"
)
SERIES_TITLE = "The value of control software in electric heavy-duty trucks"


@dataclass(frozen=True)
class Cover:
    filename: str
    part: str
    title_lines: tuple[str, ...]
    value: str
    detail_lines: tuple[str, ...]
    title_size: int = 70
    value_size: int = 78


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
)


def markup(cover: Cover) -> str:
    fields = {
        "PART": escape(cover.part),
        "TITLE": "<br>".join(map(escape, cover.title_lines)),
        "VALUE": escape(cover.value),
        "DETAIL": "<br>".join(map(escape, cover.detail_lines)),
        "SERIES_TITLE": escape(SERIES_TITLE),
        "TITLE_SIZE": str(cover.title_size),
        "VALUE_SIZE": str(cover.value_size),
    }
    html = TEMPLATE
    for key, value in fields.items():
        html = html.replace("{{" + key + "}}", value)
    return html


def render() -> None:
    OUTPUT.mkdir(parents=True, exist_ok=True)
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(channel="msedge", headless=True)
        try:
            page = browser.new_page(viewport={"width": 1200, "height": 630})
            for cover in COVERS:
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

                page.locator(".card").screenshot(path=str(OUTPUT / cover.filename))
                print(f"Rendered {cover.filename}")
        finally:
            browser.close()


if __name__ == "__main__":
    render()
