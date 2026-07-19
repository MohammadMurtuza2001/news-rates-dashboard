import { CATEGORIES } from '../../utils/categories'

function CategoryDropdown({ value, onChange, categories = CATEGORIES }) {
  return (
    <label className="category-filter">
      <span className="category-filter-label">Category</span>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        {categories.map((cat) => (
          <option key={cat.value} value={cat.value}>
            {cat.label}
          </option>
        ))}
      </select>
    </label>
  )
}

export default CategoryDropdown
