import React, { useState, useCallback } from "react";
import Modal from "../Modal";
import { useFournisseur } from "../../../context/FournisseurContext";
import { ShoppingCartIcon, TrashIcon } from "@heroicons/react/24/solid";
import { useProduit } from "../../../context/ProduitContext";
import { useAdmin } from "../../../context/AdminContext";
import { Approvisionement } from "../../../service/Approvisonement";

export default function AjoutApprovisionnement() {
  const { toast, listFournisseurs } = useAdmin();
  const { open, onclose, setOpen, getAllApprovisionement, lieu, setLieu } = useFournisseur();
  const [produitId, setProduitId] = useState("");
  const [quantite, setQuantite] = useState("");
  const [prix, setPrix] = useState("");
  const [panier, setPanier] = useState([]);
  
  const [stockage, setStockage] = useState(null);
  const [idFourn, setIdfourni] = useState(null);
  const { listProduit } = useProduit();

  // Handle product change and set price accordingly
  const handleProductChange = (event) => {
    const selectedProductId = event.target.value;
    setProduitId(selectedProductId);

    const selectedProduct = listProduit.find(
      (prod) => String(prod.id) === String(selectedProductId)
    );

    if (selectedProduct) {
      setPrix(selectedProduct.prix);
    } else {
      setPrix("");
    }
  };

  // Handle adding product to cart
  const handleAddToCart = useCallback(() => {
    if (!produitId || !quantite || !prix) {
      toast.error("Tous les champs sont obligatoires !");
      return;
    }

    const produitDejaDansPanier = panier.some(
      (item) => String(item.produit_id) === String(produitId)
    );

    if (produitDejaDansPanier) {
      toast.error("Le produit est déjà dans le panier !");
    } else {
     if(listProduit!=null){
      const produitInfo = listProduit.find(
        (prod) => String(prod.id) === String(produitId)
      );
      if (produitInfo) {
        setPanier([
          ...panier,
          { produit_id: produitId, nom: produitInfo.nom, quantite, prix },
        ]);
        setProduitId("");
        setQuantite("");
        setPrix("");
      }
     }
    }
  }, [produitId, quantite, prix, panier, listProduit, toast]);

  // Handle removing product from cart
  const handleRemoveFromCart = (index) => {
    setPanier(panier.filter((_, i) => i !== index));
  };

  // Handle validation of the approvisionnement
  const handleValidation = () => {
    if (!idFourn || panier.length === 0) {
      toast.error("Veuillez sélectionner un fournisseur et ajouter des produits !");
      return;
    }

    const totalAmount = panier.reduce((total, item) => total + item.quantite * item.prix, 0);
    if (lieu=="Ramirandava") {
      Approvisionement.createApprovisionementRami({
        fournisseur_id: idFourn,
        montant_approvisionnement: totalAmount,
        stock_id: stockage,
        produits: panier,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setStockage("")
          setPanier([]);
          setOpen(false);
          getAllApprovisionement();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        });

    } else {
      Approvisionement.createApprovisionement({
        fournisseur_id: idFourn,
        montant_approvisionnement: totalAmount,
        stockage: lieu === "Ramirandava" ? stockage : null,
        produits: panier,
      })
        .then(() => {
          toast.success("Ajout avec succès !");
          setProduitId("");
          setQuantite("");
          setPrix("");
          setPanier([]);
          setOpen(false);
          getAllApprovisionement();
        })
        .catch((error) => {
          console.error(error);
          toast.error("Une erreur est survenue. Veuillez réessayer.");
        });
    }
  };

  const totalAmount = panier.reduce((total, item) => total + item.quantite * item.prix, 0);

  return (
    <Modal open={open} onClose={onclose}>
      <div className="titre flex justify-center">
        <h1 className="text-2xl font-semibold mt-5 border-b border-gray-200 w-fit">Approvisionnement</h1>
      </div>

      <div className="contenu mt-5">
        <div className="flex items-center space-x-5">
        <div className="form-4">
          <label htmlFor="">Nom du Fournisseur</label>
          <br />
          <select
            className="w-[250px] form-control"
            onChange={(e) => setIdfourni(e.target.value)}
          >
            {listFournisseurs.map((row) => (
              <option key={row.id} value={row.id}>
                {row.nom}
              </option>
            ))}
          </select>
        </div>
        {lieu === "Ramirandava" && (
              <div>
                <label htmlFor="stockage">
                  Stockage <span className="text-red-500">*</span> <br />
                </label>
               <select name="" id="" className="form-control w-[250px]"   onChange={(e) => setStockage(e.target.value)} >
                <option value="">Selectionnez lieu  du  stockage </option>
                <option value={1}>Stock Vitrine</option>
                <option value={2}>Stock  Magasin </option>
                <option value={3}>Stock  TIKO</option>
               </select>
              </div>
            )}
        </div>

        <form onSubmit={(e) => e.preventDefault()} className="flex justify-between items-center space-x-10">
          <div className="form-group flex items-center space-x-5 mt-5">
            <div className="form1">
              <label>
                Nom du Produit <span className="text-red-500">*</span>
              </label><br />
              <select
                value={produitId}
                onChange={handleProductChange}
                className="form-control w-[250px]"
              >
                <option value="">Sélectionnez un produit</option>
                {listProduit!=null ?(listProduit.map((row) => (
                  <option key={row.id} value={row.id}>
                    {row.nom}
                  </option>
                ))) :null}
              </select>
            </div>

            <div className="form2">
              <label>
                Quantité <span className="text-red-500">*</span>
              </label><br />
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(Number(e.target.value))}
                className="form-control w-[250px]"
                placeholder="Entrer la quantité"
              />
            </div>

          </div>

          <button type="button" onClick={handleAddToCart} className="flex btn-primary items-center text-sm">
            <ShoppingCartIcon className="w-5" />
            <span className="ml-2">Ajouter</span>
          </button>
        </form>

        <div className="panier mt-3">
          <h2 className="font-semibold">Panier</h2>
          <div className="mt-5 border border-gray-300 overflow-y-auto max-h-[200px]">
            <table className="w-full">
              <thead className="bg-gray-100 text-sm">
                <tr className="text-left">
                  <th className="p-3 border border-gray-300">Produit</th>
                  <th className="p-3 border border-gray-300 text-center">Quantité</th>
                  <th className="p-3 border border-gray-300 text-right">Prix (Ar)</th>
                  <th className="p-3 border border-gray-300 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {panier.length > 0 ? (
                  panier.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200 text-sm">
                      <td className="p-3">{item.nom}</td>
                      <td className="p-3 text-center">{item.quantite}</td>
                      <td className="p-3 text-right">{item.prix} Ar</td>
                      <td className="p-3 text-right">
                        <TrashIcon
                          className="w-5 h-5 text-red-500 cursor-pointer inline"
                          onClick={() => handleRemoveFromCart(index)}
                        />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-3">
                      Aucun produit dans le panier
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="total-amount mt-2 flex justify-end text-lg font-semibold">
            Total: {totalAmount} Ar
          </div>
        </div>

        <div className="botton flex justify-end mt-2 space-x-20 items-center">
          <div className="mt-2">
            <button className="btn" onClick={onclose}>
              Annuler
            </button>
            <button className="btn-primary ml-5" onClick={handleValidation}>
              Valider
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
