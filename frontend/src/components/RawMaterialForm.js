import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRawMaterials, createRawMaterial, updateRawMaterial, deleteRawMaterial } from '../features/rawMaterialsSlice';

const RawMaterialForm = () => {
  const dispatch = useDispatch();
  const rawMaterials = useSelector((state) => state.rawMaterials.list);
  const [form, setForm] = useState({ code: '', name: '', stockQuantity: 0 });

  useEffect(() => {
    dispatch(fetchRawMaterials());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      dispatch(updateRawMaterial(form));
    } else {
      dispatch(createRawMaterial(form));
    }
    setForm({ code: '', name: '', stockQuantity: 0 });
  };

  return (
    <div className="container">
      <h2>Manage Raw Materials</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Code" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Stock Quantity" value={form.stockQuantity} onChange={(e) => setForm({ ...form, stockQuantity: parseInt(e.target.value) })} required />
        </div>
        <button type="submit" className="btn btn-primary">Save</button>
      </form>
      <ul className="list-group">
        {rawMaterials.map((rm) => (
          <li key={rm.id} className="list-group-item d-flex justify-content-between align-items-center">
            {rm.name} (Stock: {rm.stockQuantity})
            <div>
              <button className="btn btn-warning btn-sm me-2" onClick={() => setForm(rm)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => dispatch(deleteRawMaterial(rm.id))}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RawMaterialForm;