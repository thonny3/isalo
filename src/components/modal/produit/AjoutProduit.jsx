import React from 'react';
import { useProduit } from '../../../context/ProduitContext';
import Modal from '../Modal';
import { useAdmin } from '../../../context/AdminContext';

export default function AjoutProduit() {
  const { listFournisseurs } = useAdmin();
  const {
    open,
    onclose,
    getNom,
    getCategory,
    getPrix,
    getPrivVente,
    errors,
    data,
    handleSubmit,
    listCategorie,
    edit
  } = useProduit();

  return (
    <>
      <Modal open={open} onClose={onclose}>
        <div className="header">
          <h1 className="text-lg font-semibold my-5 border-b border-gray-200 w-fit">
            {edit ? "Modifier" : "Création"} Produits
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="form grid grid-cols-2 gap-10">
              {/* Colonne 1 */}
              <div className="form1">
                <div className="form-group">
                  <label htmlFor="nom">
                    Nom du produit<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="text"
                    id="nom"
                    value={data.nom}
                    className={`form-control w-full ${errors.nom && "border-red-600"}`}
                    placeholder="Entrer le nom du produit"
                    onChange={getNom}
                  />
                  {errors.nom && (
                    <p className="text-red-600 mt-1 text-sm">{errors.nom}</p>
                  )}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="prix">
                    Prix d'achat<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    id="prix"
                    value={data.prix}
                    className={`form-control w-full ${errors.prix && "border-red-600"}`}
                    placeholder="Prix d'achat"
                    onChange={getPrix}
                  />
                  {errors.prix && (
                    <p className="text-red-600 mt-1 text-sm">{errors.prix}</p>
                  )}
                </div>
              </div>

              {/* Colonne 2 */}
              <div className="form1">
                <div className="form-group">
                  <label htmlFor="categorie_id">
                    Catégorie<span className="text-red-600 ml-2">*</span>
                  </label>
                  <select
                    id="categorie_id"
                    className={`form-control w-full ${errors.categorie_id && "border-red-600"}`}
                    onChange={getCategory}
                    value={data.categorie_id}
                  >
                    <option value="">Sélectionnez une catégorie</option>
                    {listCategorie.map((row) => (
                      <option key={row.id} value={row.id}>
                        {row.nom}
                      </option>
                    ))}
                  </select>
                  {errors.categorie_id && (
                    <p className="text-red-600 mt-1 text-sm">{errors.categorie_id}</p>
                  )}
                </div>
                <div className="form-group mt-2">
                  <label htmlFor="prix_vente">
                    Prix de vente<span className="text-red-600 ml-2">*</span>
                  </label>
                  <input
                    type="number"
                    id="prix_vente"
                    value={data.prix_vente}
                    className={`form-control w-full ${errors.prix_vente && "border-red-600"}`}
                    placeholder="Prix de vente"
                    onChange={getPrivVente}
                  />
                  {errors.prix_vente && (
                    <p className="text-red-600 mt-1 text-sm">{errors.prix_vente}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Ligne de séparation */}
            <div className="border-t border-gray-200 my-5"></div>

            {/* Boutons */}
            <div className="button text-right">
              <button className="btn" type="button" onClick={onclose}>
                Annuler
              </button>
              <button className="btn-primary ml-2" type="submit">
                {edit ? "Modifier" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
