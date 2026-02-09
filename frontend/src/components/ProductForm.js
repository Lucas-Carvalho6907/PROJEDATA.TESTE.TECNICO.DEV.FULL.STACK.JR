import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../features/productsSlice';
import { fetchRawMaterials } from '../features/rawMaterialsSlice';

const ProductForm = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.list);
  const rawMaterials = useSelector((state) => state.rawMaterials.list);
  const [form, setForm] = useState({ code: '', name: '', value: '', rawMaterials: [] });

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      dispatch(updateProduct(form));
    } else {
      dispatch(createProduct(form));
    }
    setForm({ code: '', name: '', value: '', rawMaterials: [] });
  };

  const addRawMaterial = () => {
    setForm({ ...form, rawMaterials: [...form.rawMaterials, { rawMaterialId: '', requiredQuantity: 0 }] });
  };

  return (
    <div className="container">
      <h2>Manage Products</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Value" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} required />
        </div>
        <h3>Raw Materials</h3>
        {form.rawMaterials.map((rm, index) => (
          <div key={index} className="mb-3">
            <select className="form-select" value={rm.rawMaterialId} onChange={(e) => {
              const newRm = [...form.rawMaterials];
              newRm[index].rawMaterialId = e.target.value;
              setForm({ ...form, rawMaterials: newRm });
            }} required>
              <option value="">Select Raw Material</option>
              {rawMaterials.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
            </select>
            <input type="number" className="form-control mt-2" placeholder="Required Quantity" value={rm.requiredQuantity} onChange={(e) => {
              const newRm = [...form.rawMaterials];
              newRm[index].requiredQuantity = parseInt(e.target.value);
              setForm({ ...form, rawMaterials: newRm });
            }} required />
          </div>
        ))}
        <button type="button" className="btn btn-secondary me-2" onClick={addRawMaterial}>Add Raw Material</button>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      <ul className="list-group">
        {products.map((p) => (
          <li key={p.id} className="list-group-item d-flex justify-content-between align-items-center">
            {p.name} (${p.value})
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => setForm(p)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteProduct(p.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductForm;