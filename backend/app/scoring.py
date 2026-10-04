"""Turns raw measurements (minutes, dollars) into 0-100 scores.

Tune the constants here rather than editing individual listings.
"""

# A commute at or under this many minutes scores 100.
COMMUTE_BEST_MINUTES = 20
# A commute at or over this many minutes scores 0.
COMMUTE_WORST_MINUTES = 85

# Rent at or under this many dollars scores 100.
RENT_BEST = 3000
# Rent at or over this many dollars scores 0.
RENT_WORST = 3400


def score_between(value: float, best: float, worst: float) -> int:
    """Place `value` on a 0-100 scale running from `worst` up to `best`.

    Values past either anchor are clamped, so a 5-minute commute scores 100
    rather than something above it. `best` may be the larger of the two when
    more is better (square footage, say) - the ratio handles both directions.
    """
    fraction = (worst - value) / (worst - best)
    return round(max(0.0, min(1.0, fraction)) * 100)
