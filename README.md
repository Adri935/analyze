# Data Processing Pipeline

This project processes sales data from an Excel file, performs calculations, and publishes the results via GitHub Pages.

## Setup

1. Install Python 3.11+
2. Install required packages: `pip install pandas openpyxl`
3. Install ruff for linting: `pip install ruff`

## Usage

The pipeline is executed automatically via GitHub Actions on push. To run locally:

1. Convert data.xlsx to data.csv
2. Run `python execute.py > result.json`

## Code Explanation

- `execute.py`: Processes sales data, calculates metrics, and outputs JSON
- `data.csv`: Sales data in CSV format
- `.github/workflows/ci.yml`: GitHub Actions workflow for CI/CD

## License
MIT